<?php

namespace App\Responses;

use App\Entity\Team;
use Doctrine\Common\Collections\Collection;

class TeamResponse
{
    public static function toArray(Team|array|Collection $team)
    {
        if (is_array($team) || $team instanceof Collection) {
            return array_map(function ($item) {
                return self::toArray($item);
            }, is_array($team) ? $team : $team->toArray());
        }
        return [
            'id'    =>  $team->getId(),
            'name'  =>  $team->getName(),
            'country' => $team->getCountry(),
            'money' =>  $team->getMoney(),
            'logo'  =>  $team->getLogo(),
        ];
    }
}
