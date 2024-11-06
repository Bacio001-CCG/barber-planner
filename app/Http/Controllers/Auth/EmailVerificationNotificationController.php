<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard.agenda.index', absolute: false));
        }

        $request->user()->sendEmailVerificationNotification();

        Log::info('Email Verification Notification: '. Auth::user()->id);

        return back()->with('status', 'verification-link-sent');
    }
}
