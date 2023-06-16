<?php

namespace App\Requests;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

abstract class BaseRequest
{
    public function __construct(protected ValidatorInterface $validator)
    {
        $this->populate();
        if ($this->autoValidateRequest()) {
            $this->validate();
        }
    }

    protected function autoValidateRequest(): bool
    {
        return true;
    }

    public function validate()
    {
        $errors = $this->validator->validate($this);
        $messages = ['message' => 'validation_failed', 'errors' => []];

        foreach ($errors as $message) {
            $messages['errors'][] = [
                'property' => $message->getPropertyPath(),
                'value' => $message->getInvalidValue(),
                'message' => $message->getMessage(),
            ];
        }

        if (count($messages['errors']) > 0) {
            $response = new JsonResponse($messages);
            $response->send();

            exit;
        }
    }
    public function getRequest(): Request
    {
        return Request::createFromGlobals();
    }

    protected function populate(): void
    {
        $request = $this->getRequest();
        $data = $this->extractData($request);
        foreach ($data as $property => $value) {
            if (property_exists($this, $property)) {
                $this->{$property} = $value;
            }
        }
    }
    protected function extractData(Request $request): array
    {
        if ($request->headers->get('Content-Type') === 'application/json') {
            return json_decode($request->getContent(), true);
        }
        return array_merge($request->request->all(), $request->query->all());
    }
}
