<?php

namespace App\Tests\Repository;

use App\Entity\Player;
use App\Entity\Team;
use App\Repository\TeamRepository;

class TeamRepositoryTest extends BaseRepositoryTest
{
    /**
     * @var TeamRepository
     */
    protected $teamRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->teamRepository = static::getContainer()->get(TeamRepository::class);
    }
    public function testPlayerSave(): void
    {
        $team = new Team;
        $team->setName($this->faker->word());
        $team->setCountry($this->faker->countryCode());
        $team->setMoney($this->faker->randomNumber(6, false));

        $playerCount = $this->faker->numberBetween(10, 20);
        for ($i = 0; $i < $playerCount; $i++)
        {
            $player = $this->generatePlayer();
            $this->entityManager->persist($player);
            $team->addPlayer($player);
        }

        $this->teamRepository->save($team, true);

        $teamSaved = $this->teamRepository->findOneBy(['id' => $team->getId()]);

        $this->assertNotNull($team);
        $this->assertEquals($team->getName(), $teamSaved->getName());
        $this->assertEquals($team->getCountry(), $teamSaved->getCountry());

        $this->assertEquals($playerCount, $teamSaved->getPlayers()->count());

    }

    private function generatePlayer()
    {
        $player = new Player;
        $player->setFirstName($this->faker->firstName());
        $player->setLastName($this->faker->lastName());
        $player->setValue($this->faker->randomNumber(6, false));
        $player->setPhoto($this->faker->url());

        return $player;
    }
}
