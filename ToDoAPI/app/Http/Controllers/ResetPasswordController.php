<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
   public function sendEmail(Request $request)
   {
       if (!$this->validateEmail($request->email)) {
        return $this->failedResponse();
       }
       $this->send($request->email);
   }

   public function send($email) {
       Mail::to($email)->send(new ResetPasswordMail);
   }

   public function validateEmail($email) {
       return !!User::where('email', $email)->first();
   }

   public function failedResponse() {
       return response()->json([
           'error' => 'email does not exist!'
       ], JsonResponse::HTTP_NOT_FOUND);
   }

   public function successResponse() {
       return response()->json([
           'error' => 'Reset email sent, please check your mail box!'
       ], JsonResponse::HTTP_OK);
   }
}
