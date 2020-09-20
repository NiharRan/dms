<?php

namespace App\Providers;

use App\Helpers\Helper;
use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }

  /**
   * Bootstrap any application services.
   *
   * @return void
   * @throws \Exception
   */
    public function boot()
    {
        Schema::defaultStringLength(191);

      Inertia::share('configData', Helper::applClasses());
      Inertia::share('errors', function () {
        return session()->get('errors') ? session()->get('errors')->getBag('default')->getMessages() : (object) [];
      });

      Inertia::share('success', function () {
        return session()->get('success') ? session()->get('success') : null;
      });
      Inertia::share('locale', app()->getLocale());
      Inertia::share('lang', cache('lang'));
    }
}
