<?php

namespace App\Tests\Repository;

use App\Entity\Player;
use App\Repository\PlayerRepository;

class PlayerRepositoryTest extends BaseRepositoryTest
{
    /**
     * @var PlayerRepository
     */
    protected $playerRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->playerRepository = static::getContainer()->get(PlayerRepository::class);
    }
    public function testPlayerSave(): void
    {
        $player = new Player;
        $player->setFirstName($this->faker->firstName());
        $player->setLastName($this->faker->lastName());
        $player->setValue($this->faker->randomNumber(6, false));
        $player->setPhoto($this->faker->url());

        $this->playerRepository->save($player, true);

        $playerSaved = $this->playerRepository->findOneBy(['id' => $player->getId()]);

        $this->assertNotNull($player);
        $this->assertEquals($player->getFirstName(), $playerSaved->getFirstName());
        $this->assertEquals($player->getLastName(), $playerSaved->getLastName());
    }
}
