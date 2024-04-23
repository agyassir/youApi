<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(Request $request){
        
        $request->validate([
           'name'=>'required|string',
           'email'=>'required|string',
           'password'=>'required|string|min:8',
        ]);

        $check=User::where('email',$request->email)->exists();
        if(!$check){
        $password=Hash::make($request->password);
        $register=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$password,
            'role_id'=>'2'
        ]);
        return response()->json(['response'=>'you have been registered succsefully' ],200);
        
        }else
        {
            return response()->json(['error'=>'email already used' ] , 200);
        }
        

    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:8',
        ]);
    
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
            return response()->json(['token' => $token, 'message' => 'Login successful'], 200);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect(route('index'));
    }
}
