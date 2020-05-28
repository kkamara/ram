<?php

namespace App\Http\Requests;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CharacterRequest extends FormRequest
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
            'name' => 'max:255',
            'status' => [
                Rule::in(['', 'alive', 'dead', 'unknown']),
                'max:255'
            ],
            'species' => 'max:255',
            'type' => 'max:255',
            'gender' => [
                Rule::in(['', 'female', 'male', 'genderless', 'unknown']),
                'max:255',
            ],
        ];
    }

    /**
     * If validator fails return the exception in json form
     * @param Validator $validator
     * @return array
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        /**
         * Store sanitized form fields.
         * @var array $input
         */
        $input = [];

        if (isset($this->name) && strlen($this->name)) {
            $input['name'] = filter_var($this->name, FILTER_SANITIZE_STRING);
        }

        if (isset($this->status) && strlen($this->status)) {
            $input['status'] = filter_var($this->status, FILTER_SANITIZE_STRING);
        }

        if (isset($this->species) && strlen($this->species)) {
            $input['species'] = filter_var($this->species, FILTER_SANITIZE_STRING);
        }

        if (isset($this->type) && strlen($this->type)) {
            $input['type'] = filter_var($this->type, FILTER_SANITIZE_STRING);
        }

        if (isset($this->gender) && strlen($this->gender)) {
            $input['gender'] = filter_var($this->gender, FILTER_SANITIZE_STRING);
        }

        $this->merge($input);
    }
}
