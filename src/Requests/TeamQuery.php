<?php

namespace App\Requests;

use App\Requests\PaginationRequest;
use Symfony\Component\Validator\Constraints\Type;

class TeamQuery extends PaginationRequest
{
    #[Type('string')]
    public $search = null;
}
