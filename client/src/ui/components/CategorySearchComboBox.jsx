import React, { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';

const CategorySearchComboBox = ({ selected, setSelected, categories, content, setContent }) => {
  return (
    <div className="combobox_field">
      <Combobox value={selected} onChange={setSelected}>
        <div className="combobox_search_field">
          <div className="combobox_search_box">
            <Combobox.Input
              displayValue={(categoryData) => categoryData.category ? categoryData.category.content : categoryData.content}
              onChange={event => setContent(event.target.value)}
            />
            <Combobox.Button >
              <i className="fa-solid fa-up-down"></i>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setContent('')}
          >
            <Combobox.Options className="combobox_items_dropdown_box">
              {categories.length === 0 && content !== '' ? (
                <div className="empty_box">
                  Nothing found.
                </div>
              ) : (
                categories.map((categoryData, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `combo_box_item_box ${active && 'active'}`
                    }
                    value={categoryData}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`combo_box_item_text ${selected && 'selected'}`}
                        >
                          {categoryData.category.content}
                        </span>
                        {selected ? (
                          <span
                            className={`combo_box_item_checkbox ${active && 'active'}`}
                          >
                            <i className="fa-solid fa-check"></i>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}


export default CategorySearchComboBox