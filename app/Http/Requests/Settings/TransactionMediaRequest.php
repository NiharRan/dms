<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class TransactionMediaRequest extends FormRequest
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
    $rules = 'required|string';
    if ($this->isPostRequest()) {
      $rules .= '|unique:transaction_media';
    }
    return [
      'name' => $rules
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
      'name.required' => 'Transaction media name is required',
      'name.string'  => 'Invalid name',
    ];
    if ($this->isPostRequest()) {
      $messages['name.unique']  = 'Already exists! Try another one';
    }
    return $messages;
  }

  private function isPostRequest()
  {
    return request()->method() === "POST";
  }
}
