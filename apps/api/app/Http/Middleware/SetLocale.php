<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get locale from Accept-Language header or default to English
        $locale = $request->header('Accept-Language', 'en');
        
        // Validate locale against supported locales
        $supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl'];
        
        if (in_array($locale, $supportedLocales)) {
            App::setLocale($locale);
        } else {
            // Fallback to English if locale is not supported
            App::setLocale('en');
        }
        
        // Store locale in request for use in controllers
        $request->attributes->set('locale', App::getLocale());
        
        return $next($request);
    }
}
