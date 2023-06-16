<?php

namespace App\Entity;

use App\Repository\TransactionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TransactionRepository::class)]
class Transaction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'transactions')]
    private ?Player $player = null;

    #[ORM\ManyToOne]
    private ?Team $fromTeam = null;

    #[ORM\ManyToOne]
    private ?Team $toTeam = null;

    #[ORM\Column]
    private ?\DateTime $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer(): ?Player
    {
        return $this->player;
    }

    public function setPlayer(?Player $player): static
    {
        $this->player = $player;

        return $this;
    }

    public function getFromTeam(): ?Team
    {
        return $this->fromTeam;
    }

    public function setFromTeam(?Team $fromTeam): static
    {
        $this->fromTeam = $fromTeam;

        return $this;
    }

    public function getToTeam(): ?Team
    {
        return $this->toTeam;
    }

    public function setToTeam(?Team $toTeam): static
    {
        $this->toTeam = $toTeam;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
