<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SimplePagination extends Component
{
    /**
     * Optional URI encoded filters var
     * @var string $filters
     */
    private $filters = '';

    /**
     * Store resource data.
     * @var array|boolean $data
     */
    private $data = [];

    /**
     * Create a new component instance.
     *
     * @param string $filters
     * @param array|boolean $data
     * @return void
     */
    public function __construct($filters='', $data)
    {
        $this->filters = $filters;
        $this->data = $data;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.simple-pagination', [
            'filters' => $this->filters,
            'data' => $this->data,
        ]);
    }
}
