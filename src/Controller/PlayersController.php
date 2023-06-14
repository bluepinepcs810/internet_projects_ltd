<?php

namespace App\Controller;

use App\Entity\Player;
use App\Repository\PlayerRepository;
use App\Requests\PaginationRequest;
use App\Requests\PlayerRequest;
use App\Responses\PlayerResponse;
use App\Responses\TeamResponse;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class PlayersController extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $entityManager,
        protected PlayerRepository $playerRepository
    )
    {}

    #[Route('/players', name: 'players_list')]
    public function index(PaginationRequest $request): JsonResponse
    {
        $query = $this->playerRepository->createQueryBuilder('t')
            ->orderBy('t.' . $request->sortBy, $request->dir)
            ->getQuery();

        $paginator = new Paginator($query);

        $totalCount = count($paginator);
        $totalPages = ceil($totalCount / $request->perPage);

        $teams = $paginator
            ->getQuery()
            ->setFirstResult($request->getOffset())
            ->setMaxResults($request->perPage)
            ->getResult();
        $result = [
            'total' =>  $totalCount,
            'pages' =>  $totalPages,
            'data'  =>  TeamResponse::toArray($teams)
        ];
        return $this->json($result);
    }

    #[Route('/players', name: 'players_create', methods: ['POST'])]
    public function create(PlayerRequest $request)
    {
        if ($request->teamId)
        {
            $team = $this->playerRepository->find($request->teamId);
            if (!$team) return $this->json(['message' => 'Team not found'], 404);
        }

        $player = new Player;
        $player->fromRequest($request);

        // TODO upload photo

        $this->playerRepository->save($player);
        $this->entityManager->flush();

        return $this->json(PlayerResponse::toArray($player));
    }

    #[Route('/players/{playerId}', name: 'players_retrieve', methods: ['GET'])]
    public function retrieve($playerId): JsonResponse
    {
        $player = $this->playerRepository->find($playerId);
        if (!$player)
        {
            return $this->json(['message' => 'Player not found'], 404);
        }
        return $this->json(PlayerResponse::toArray($player));
    }

    #[Route('/players/{playerId}', name: 'players_update', methods: ['POST'])]
    public function update($playerId, PlayerRequest $request): JsonResponse
    {
        $player = $this->playerRepository->find($playerId);
        if (!$player)
        {
            return $this->json(['message' => 'Player not found'], 404);
        }
        if ($request->teamId)
        {
            $team = $this->playerRepository->find($request->teamId);
            if (!$team) return $this->json(['message' => 'Team not found'], 404);
        }
        $player->fromRequest($request);
        return $this->json(PlayerResponse::toArray($player));
    }

}
