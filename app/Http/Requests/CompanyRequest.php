<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
      $rules .= '|unique:products';
    }
    return [
      'name' => $rules,
      'owner' => 'required',
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
      'name.required' => 'Company name is required',
      'owner.required' => 'Company owner type is required',
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
