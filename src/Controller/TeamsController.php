<?php

namespace App\Controller;

use App\Entity\Team;
use App\Entity\Transaction;
use App\Repository\PlayerRepository;
use App\Repository\TeamRepository;
use App\Repository\TransactionRepository;
use App\Requests\BuyRequest;
use App\Requests\PaginationRequest;
use App\Requests\TeamQuery;
use App\Requests\TeamRequest;
use App\Responses\PlayerResponse;
use App\Responses\TeamResponse;
use App\Services\FileService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class TeamsController extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $entityManager,
        protected TeamRepository $teamRepository
    ) {
    }
    #[Route('/api/teams', name: 'team_list', methods: ['GET'])]
    public function index(TeamQuery $request, PlayerRepository $playerRepository): JsonResponse
    {
        $request->validate();

        $qb = $this->teamRepository->createQueryBuilder('t')
            ->orderBy('t.' . $request->sortBy, $request->dir);
        if ($request->search) {
            $qb->where('LOWER(t.name) like LOWER(:name)')
                ->setParameter('name', '%' . $request->search . '%');
        }
        $query = $qb->getQuery();

        $paginator = new Paginator($query);

        $totalCount = count($paginator);
        $totalPages = ceil($totalCount / $request->perPage);

        $teams = $paginator
            ->getQuery()
            ->setFirstResult($request->getOffset())
            ->setMaxResults($request->perPage)
            ->getResult();
        foreach ($teams as $team) {
            $playerCount = $playerRepository->createQueryBuilder('p')
                ->where('p.team = :team')
                ->setParameter('team', $team)
                ->select('count(p.id)')
                ->getQuery()
                ->getSingleScalarResult();
            $team->setPlayerCount($playerCount);
        }
        $result = [
            'total' =>  $totalCount,
            'pages' =>  $totalPages,
            'data'  =>  TeamResponse::toArray($teams)
        ];
        return $this->json($result);
    }

    #[Route('/api/teams', name: 'team_create', methods: ['POST'])]
    public function create(TeamRequest $request, FileService $fileService): JsonResponse
    {
        $team = new Team;
        $team->fromRequest($request);

        if ($request->logo) {
            $url = $fileService->saveTeamLogoFromBlob($request->logo);
            $team->setLogo($url);
        }

        $this->teamRepository->save($team);
        $this->entityManager->flush();
        return $this->json(TeamResponse::toArray($team));
    }

    #[Route('/api/teams/{teamId}', methods: ['GET'])]
    public function retrieve($teamId): JsonResponse
    {
        $team = $this->teamRepository->findOneBy(['id' => $teamId]);
        if (!$team) {
            return $this->json(['message' => 'Team Not found'], 404);
        }
        return $this->json(TeamResponse::toArray($team));
    }

    #[Route('/api/teams/{teamId}', methods: ['POST'])]
    public function update(TeamRequest $teamRequest, $teamId): JsonResponse
    {
        $team = $this->teamRepository->findOneBy(['id' => $teamId]);
        if (!$team) {
            return $this->json(['message' => 'Team Not found'], 404);
        }
        $team->fromRequest($teamRequest);
        $this->teamRepository->save($team);
        $this->entityManager->flush();

        return $this->json(TeamResponse::toArray($team));
    }

    #[Route('/api/teams/{teamId}/buy/players/{playerId}', methods: ['POST'])]
    public function buy($teamId, $playerId, BuyRequest $request, PlayerRepository $playerRepository, TransactionRepository $transactionRepository): JsonResponse
    {
        $team = $this->teamRepository->find($teamId);
        $player = $playerRepository->find($playerId);

        if (!$team || !$player) {
            return $this->json(['message', 'Invalid data'], 404);
        }

        if ($team->getMoney() < $request->amount) {
            return $this->json(['message', 'Insufficient balance'], 404);
        }

        $fromTeam = $player->getTeam();
        if ($fromTeam) {
            if ($fromTeam->getId() === $team->getId()) {
                return $this->json(['message', 'The same to and from teams'], 404);
            }
            $fromTeam->increaseMoney($request->amount);
            $team->decreaseMoney($request->amount);
            $this->teamRepository->save($fromTeam);
            $this->teamRepository->save($team);
        }

        $player->setTeam($team);
        $playerRepository->save($player);

        $transaction = new Transaction;
        $transaction->setPlayer($player);
        $transaction->setFromTeam($fromTeam);
        $transaction->setToTeam($team);
        $transaction->setCreatedAt(new DateTime());

        $transactionRepository->save($transaction);
        $this->entityManager->flush();

        return $this->json(PlayerResponse::toArray($player));
    }
}
