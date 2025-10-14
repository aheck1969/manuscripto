<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

abstract class LocalizedResource extends JsonResource
{
    /**
     * Get localized message from Laravel's localization
     */
    protected function getLocalizedMessage(string $key, array $replace = []): string
    {
        return trans("messages.{$key}", $replace);
    }

    /**
     * Get localized API message
     */
    protected function getApiMessage(string $key, array $replace = []): string
    {
        return trans("messages.api.{$key}", $replace);
    }

    /**
     * Transform the resource into an array with localized messages
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        
        // Add localized messages to the response
        $data['_messages'] = [
            'success' => $this->getApiMessage('created'),
            'locale' => app()->getLocale(),
        ];
        
        return $data;
    }
}
