<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleRequest extends FormRequest
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
      'client_id' => 'required',
      'driver_name' => 'required',
      'track_no' => 'required',
      'dl_no' => 'required'
    ];
  }

  /**
   * Get the error messages for the defined validation rules.
   *
   * @return array
   */
  public function messages()
  {
    return [
      'client_id.required' => 'Client is required',
      'driver_name.required' => 'Driver name is required',
      'track_no.required'  => 'Track number is required',
      'dl_no.required'  => 'D.L. number is required',
    ];
  }
}