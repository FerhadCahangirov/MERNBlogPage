import { Combobox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { useGetTagsReducer } from '../../customHooks/tagCustomHooks';


export const TagSearchComboBox = ({ setTagsList, tagsList }) => {

    const { tagsData, TagContent_Encapsulated, SelectedTag_Encapsulated } = useGetTagsReducer();

    const addTo_TagList = () => {
        let checkexists = false;
        if (SelectedTag_Encapsulated.get) {
            tagsList.map(tag => { if (tag._id === SelectedTag_Encapsulated.get._id) checkexists = true; })
            !checkexists && setTagsList([...tagsList, SelectedTag_Encapsulated.get]);
        }
    }

    return (
        <div className="tag_search_field">
            <div className="combobox_field">
                <Combobox value={SelectedTag_Encapsulated.get} onChange={SelectedTag_Encapsulated.set}>
                    <div className="combobox_search_field">
                        <div className="combobox_search_box">
                            <Combobox.Input
                                displayValue={(tagData) => tagData.content}
                                onChange={event => TagContent_Encapsulated.set(event.target.value)}
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
                            afterLeave={() => TagContent_Encapsulated.set('')}
                        >
                            <Combobox.Options className="combobox_items_dropdown_box">
                                {tagsData && tagsData.tags && tagsData.tags.length === 0 && TagContent_Encapsulated.get !== '' ? (
                                    <div className="empty_box">
                                        Nothing found.
                                    </div>
                                ) : (
                                    tagsData && tagsData.tags && tagsData.tags.map((tagData, index) => (
                                        <Combobox.Option
                                            key={index}
                                            className={({ active }) =>
                                                `combo_box_item_box ${active && 'active'}`
                                            }
                                            value={tagData}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`combo_box_item_text ${selected && 'selected'}`}
                                                    >
                                                        {tagData.content}
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
            <a onClick={() => addTo_TagList()}><i className="fa-solid fa-circle-plus"></i></a>
        </div>
    )
}

export default TagSearchComboBox