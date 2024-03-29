<?php

namespace App\Requests;

use Symfony\Component\Validator\Constraints\Type;

class PlayerQuery extends PaginationRequest
{
    #[Type('numeric')]
    public $teamId;

    #[Type('numeric')]
    public $notTeamId;

    #[Type('string')]
    public $search;
}
