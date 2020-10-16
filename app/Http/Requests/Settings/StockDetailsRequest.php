<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class StockDetailsRequest extends FormRequest
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
      'stock_id' => 'required',
      'product_id' => 'required',
      'amount' => 'required|integer|gte:0',
      'quantity' => 'required|integer|gte:0',
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
      'stock.required' => 'Stock house is required',
      'product.required' => 'Product is required',
      'amount.required' => 'Stock amount is required',
      'amount.integer' => 'Invalid stock amount',
      'amount.gte' => 'Stock amount must be greater then or equal zero',
      'quantity.required' => 'Stock quantity is required',
      'quantity.integer' => 'Invalid stock quantity',
      'quantity.gte' => 'Stock quantity must be greater then or equal zero',
    ];
    return $messages;
  }
}
