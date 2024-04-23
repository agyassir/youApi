<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Type;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class WalletController extends Controller
{
    //

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="Your API",
 *      description="Description of your API",
 *      @OA\Contact(
 *          email="ahmed@example.com"
 *      )
 * )
 * @OA\Post(
 *     path="/api/store",
 *     tags={"Wallets"},
 *     summary="Create a new wallet",
 *     operationId="createWallet",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"montant", "type"},
 *             @OA\Property(property="montant", type="integer", example="1000"),
 *             @OA\Property(property="type", type="integer", example="1")
 *         ),
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="your_wallet_number", type="string"),
 *             @OA\Property(property="you_have", type="integer"),
 *             @OA\Property(property="you_chose", type="string"),
 *             @OA\Property(property="you_can_access_to", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input or wallet type already exists",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthorized - Create an account first to have a wallet",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     ),
 *     security={
 *         {"bearerAuth": {}}
 *     }
 * )
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      in="header",
 *      name="Authorization",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 * )
 */


    public function store(Request $request){
           $request->validate([
             'montant'=>'required',
             'type'=>'required|integer',
           ]);
           if(Auth::user()){
            $type=Wallet::where('type_id',$request->type)->where('user_id',Auth::id())->exists();
            if($type){
                return response()->json(['error'=>'you already have this kind of wallet please acces to your wallet or choose another type'],400);
            }else{
           $wallet=Wallet::create([
            'montant'=>$request->montant,
            'id'=> Str::uuid(),
            'user_id'=>Auth::id(),
            'type_id'=>$request->type,
            
           ]);
           $id=$this->get($wallet->type_id);
           
             $data=[
                'your wallet number'=>$id ,
                'you have :'=>$wallet->montant,
                'you chose :'=>$wallet->type->type,
                'you can get '=>$wallet->type->platfont.'$ at once',
            ];
           return response()->json($data,200);
        }}else{
            return response()->json(['error'=>'create an account first to have a wallet'],400);
        }
    }


    public function get($id){
        $query = DB::table('wallets')
    ->where('type_id', $id)
    ->select(DB::raw('CAST(id AS CHAR) AS id'))
    ->first();
        return $query->id;
    }

    public function mine() {
        $wallet = DB::table('wallets')
            ->join('types', 'wallets.type_id', '=', 'types.id')
            ->where('wallets.user_id', Auth::id())
            ->select('wallets.type_id', 'types.type')
            ->get();
    
        $user = Auth::user();
    
        return response()->json([
            'user' => $user,
            'wallets' => $wallet
        ]);
    }




        public function send(Request $request) {
            $request->validate([
                'uuid' => 'required',
                'MyUuid' => 'required',
                'montant' => 'required|numeric|min:0',
            ]);

            $receiver = Wallet::where('id', $request->uuid)->first();
            $sender = Wallet::where('id', $request->MyUuid)->first();
        

            if (!$receiver || !$sender) {
                return response()->json(['error' => 'One or both wallets not found'], 404);
            }
        

            if ($sender->montant < $request->montant) {
                return response()->json(['error' => 'you do not have enough balance for this transaction'], 400);
            }
        
            try {
                DB::beginTransaction();
                $receiver->update(['montant' => $receiver->montant + $request->montant]);
                $sender->update(['montant' => $sender->montant - $request->montant]);
                $transaction=Transaction::create([
                    'receiver'=>$request->uuid,
                    'sender'=>$request->MyUuid,
                    'montant'=>$request->montant,
                ]);
        
                DB::commit();
        
                return response()->json(['message' => 'Transaction successful'], 200);
            } catch (\Exception $e) {
                DB::rollBack();
                return response()->json(['error' => 'Transaction failed'], 500);
            }
        }

        public function history($id){
            if(Auth::user()->role_id == 1 ){
                $transactions=Transaction::all();
                return $transactions;
            }else{
            $wallet=User::find(Auth::id())->wallets->where('type_id',$id)->first();
            $transactions=Transaction::where('sender',$wallet->id)->orWhere('receiver',$wallet->id)->get();
           $type=Type::find($wallet->type_id);
            return response()->json([
                'transactions' => $transactions,
                'wallet'=>$wallet,
                'type'=>$type
            ]);
        }
        }

        public function add(Request $request){
            $request->validate([
                'montant'=>'required',
                'type'=>'required|integer',
            ]);
         

            $wallet=Wallet::where('type_id',$request->type)->where('user_id',Auth::id())->first();
            // dd($wallet->montant);
            $wallet->montant = $wallet->montant + $request->montant;
            $wallet->save();
            return $wallet;
        }


    
}
