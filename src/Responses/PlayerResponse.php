<?php

namespace App\Responses;

use App\Entity\Player;
use Doctrine\Common\Collections\Collection;

class PlayerResponse
{
    public static function toArray(Player|array|Collection $player)
    {
        if (is_array($player) || $player instanceof Collection) {
            return array_map(function ($item) {
                return self::toArray($item);
            }, is_array($player) ? $player : $player->toArray());
        }
        $team = $player->getTeam();
        return [
            'id'        =>  $player->getId(),
            'firstName' =>  $player->getFirstName(),
            'lastName'  =>  $player->getLastName(),
            'value'     =>  $player->getValue(),
            'photo'     =>  $player->getPhoto(),
            'teamId'    =>  $player->getTeam()?->getId(),
            'team'      =>  $team ? TeamResponse::toArray($team) : null
        ];
    }
}
