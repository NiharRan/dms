<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class LoadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'amount' => 'required|numeric',
      'stock_rent' => 'required|numeric',
    ];
  }

  /**
   * Get the error messages for the defined validation rules.
   *
   * @return array
   */
  public function messages()
  {
    $messages = [
      'amount.required' => 'Load amount is required',
      'amount.numeric'  => 'Invalid amount',
      'stock_rent.required' => 'Stock rent amount is required',
      'stock_rent.numeric'  => 'Invalid amount',
    ];
    return $messages;
  }
}
