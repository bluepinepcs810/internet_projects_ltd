<?php

namespace App\Services;

use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class FileService
{
    const UPLOADED_FILE_URL_PREFIX = '/uploads';

    public function __construct(
        private ParameterBagInterface $params,
        private SluggerInterface $slugger
    ) {

    }

    public function saveTeamLogoFromBlob(mixed $file)
    {
        $newFilename = $this->generateFileName($file);
        $file->move($this->params->get('image_upload_directory') . '/team_logos', $newFilename);

        return self::UPLOADED_FILE_URL_PREFIX . '/team_logos/' . $newFilename;
    }

    private function generateFileName(mixed $file)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        return $newFilename;
    }
}
