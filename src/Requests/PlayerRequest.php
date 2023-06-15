<?php

namespace App\Requests;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Image;
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
    #[Range(min: 0)]
    public $value = 0;

    #[Type('numeric')]
    public $teamId;

    #[Image()]
    #[File(['maxSize' => '2M'])]
    public $photo;

    protected function extractData(Request $request): array
    {
        $data = parent::extractData($request);
        $data['photo'] = $request->files->get('photo');
        return $data;
    }
}
