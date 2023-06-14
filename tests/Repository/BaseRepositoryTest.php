<?php

namespace App\Tests\Repository;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Faker\Factory;


abstract class BaseRepositoryTest extends KernelTestCase
{
    protected $faker;
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $entityManager;

    protected function setUp(): void
    {
        $kernel = self::bootKernel();

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();

        $this->faker = Factory::create();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        $this->entityManager->close();
        $this->entityManager = null;
    }

}
