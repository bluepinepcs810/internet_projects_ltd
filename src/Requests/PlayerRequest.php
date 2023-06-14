<?php

namespace App\Requests;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Range;
use Symfony\Component\Validator\Constraints\Type;

class PlayerRequest extends BaseRequest
{
    #[Type('string')]
    #[NotBlank()]
    #[Length(min: 1, max: 50)]
    public $firstName;

    #[Type('string')]
    #[NotBlank()]
    #[Length(min: 1, max: 50)]
    public $lastName;

    #[Type('numeric')]
    #[NotNull()]
    #[Range(min: 0)]
    public $value;

    #[Type('numeric')]
    public $teamId;
}
