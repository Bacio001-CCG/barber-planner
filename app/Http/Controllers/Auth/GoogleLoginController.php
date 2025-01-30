<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\GoogleUser;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

class GoogleLoginController extends Controller
{
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')
            ->with([
                'access_type' => 'offline',
                'prompt' => 'consent'
            ])
            ->scopes([
                'https://www.googleapis.com/auth/calendar.events',
                'https://www.googleapis.com/auth/calendar'
            ])
            ->redirect();
    }

    public function handleGoogleCallback(): RedirectResponse
    {
        // Retrieve the Google user via Socialite
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Store or update user information in your database
        $user = GoogleUser::updateOrCreate(
            ['email' => $googleUser->email],
            [
                'refresh_token' => $googleUser->refreshToken, // Store the refresh token!
                'user_id' => Auth::id(),
                'name' => $googleUser->name,
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar,
                'token' => $googleUser->token, // Store access token
            ]
        );

        return redirect()->route('dashboard.settings.index');

    }
}
