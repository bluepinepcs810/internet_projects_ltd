<?php

namespace App\Requests;

use Symfony\Component\Validator\Constraints\Type;

class PaginationRequest extends BaseRequest
{
    #[Type('numeric')]
    public $page = 1;

    #[Type('numeric')]
    public $perPage = 10;

    #[Type('string')]
    public $sortBy = 'id';

    #[Type('string')]
    public $dir = 'desc';

    public function getOffset()
    {
        return $this->perPage * ($this->page - 1);
    }
}
