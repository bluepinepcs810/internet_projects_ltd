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

    #[ORM\Column(type: Types::INTEGER)]
    private $playerId;

    #[ORM\ManyToOne(inversedBy: 'transactions')]
    #[ORM\JoinColumn(nullable: false, name: "playerId", referencedColumnName:"id")]
    private ?Player $player = null;

    #[ORM\Column(type: Types::INTEGER)]
    private $fromTeamId;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(name: "fromTeamId", referencedColumnName:"id")]
    private ?Team $fromTeam = null;

    #[ORM\Column(type: Types::INTEGER)]
    private $toTeamId;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false, name: "toTeamId", referencedColumnName:"id")]
    private ?Team $toTeam = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayerId(): int
    {
        return $this->playerId;
    }
    public function setPlayerId($playerId): static
    {
        $this->playerId = $playerId;
        return $this;
    }

    public function getFromTeamId(): int
    {
        return $this->fromTeamId;
    }
    public function setFromTeamId($fromTeamId): static
    {
        $this->fromTeamId = $fromTeamId;
        return $this;
    }
    public function getToTeamId(): int
    {
        return $this->toTeamId;
    }
    public function setToTeamId($toTeamId): static
    {
        $this->toTeamId = $toTeamId;
        return $this;
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
