<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/{reactRouting}', name: 'index', defaults: ['reactRouting' => null])]
    #[Route('/teams/{reactRouting}', name: 'index_teams', defaults: ['reactRouting' => null])]
    #[Route('/teams/{reactRouting}', name: 'index_players', defaults: ['reactRouting' => null])]
    public function index()
    {
        return $this->render('default/index.html.twig', [
            'controller_name'   =>  'DefaultController'
        ]);
    }
}
