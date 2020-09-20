<?php

namespace App\Providers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class LanguageServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Cache::rememberForever('lang', function () {
          $lang = collect();
          foreach (['en', 'bn'] as $locale) {
            $lang[$locale] = [
              'php' => $this->loadPhpTranslations($locale),
              'json' => $this->loadJsonTranslations($locale)
            ];
          }
          return $lang;
        });
    }

  private function loadPhpTranslations(string $locale)
  {
    $path = resource_path("lang/$locale");

    return collect(File::allFiles($path))->flatMap(function ($file) use ($locale) {
      $key = ($translation = $file->getBasename('.php'));

      return [$key => trans($translation, [], $locale)];
    });
  }

  private function loadJsonTranslations(string $locale)
  {
    $path = resource_path("lang/$locale.json");

    if (is_string($path) && is_readable($path)) {
      return json_decode(file_get_contents($path), true);
    }

    return  [];
  }
}
