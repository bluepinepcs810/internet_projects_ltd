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

    #[Type('numeric')]
    public $teamId;

    #[Image()]
    #[File(['maxSize' => '2M'])]
    public $logo;

    protected function extractData(Request $request): array
    {
        $data = parent::extractData($request);
        $data['logo'] = $request->files->get('logo');
        return $data;
    }

}
