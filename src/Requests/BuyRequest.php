<?php

namespace App\Requests;

use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Range;
use Symfony\Component\Validator\Constraints\Type;

class BuyRequest extends BaseRequest
{
    #[Type('numeric')]
    #[NotNull()]
    #[Range(min: 0)]
    public $amount;
}
