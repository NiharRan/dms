<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Inertia\Inertia;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

  /**
   * Show the application's login form.
   *
   * @return \Inertia\Response
   */
  public function showLoginForm()
  {
    return Inertia::render('Auth/Login');
  }

  /**
   * Get the login username to be used by the controller.
   *
   * @return string
   */
 public function username()
 {
   $login = request()->input('email');

   $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
   request()->merge([$field => $login]);

   return $field;
 }

}
