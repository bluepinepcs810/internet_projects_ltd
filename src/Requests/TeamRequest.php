<?php

namespace App\Requests;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Range;
use Symfony\Component\Validator\Constraints\Type;

class TeamRequest extends BaseRequest
{
    #[Type('string')]
    #[NotBlank()]
    #[Length(min: 1, max: 50)]
    public $name;

    #[Type('string')]
    #[NotBlank()]
    #[Length(min: 1, max: 50)]
    public $country;

    #[Type('numeric')]
    #[NotNull()]
    #[Range(min: 0)]
    public $money;
}
