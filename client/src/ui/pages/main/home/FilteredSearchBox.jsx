import Tag from '../../../components/Tag';

const FilteredSearchBox = () => {
    
    return (
        <section className="filtered_search_box" data-aos="zoom-in-up">
            <div className="filtered_search_inner" >
                <div class="row">
                    <div class="col-6 col-md-4 date_search_field">
                        <label for="dateofbirth" className="date_label">Date Of Posted</label>
                        <input type="date" name="dateofbirth" id="dateofbirth" className="date_input" />
                    </div>

                    <div class="col-6 col-md-4 category_field">

                        <div class="container">
                            <h1 class="heading">Search for post</h1>
                            <div class="searchInputWrapper">
                                <input class="searchInput" type="text" placeholder='focus here to search...' />
                                <i class="searchInputIcon fa fa-search"></i>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 search_field">

                    </div>

                </div>


                <div class="row">
                    <div class="col-sm-6 tags_field">
                        <main className="tags_container">
                            <Tag content={'instagram'} index={1} tagId={1} editable={true} setTagsList={() => {}} tagsList={[]}/>
                        </main>

                        <span ><i class="fa-solid fa-tag"></i> Tags Field</span>

                    </div>
                    <div class="col-sm-6 filter_btn_field ">
                        <div className="col">
                            <a href=""><i class="fa-solid fa-window-restore"></i> </a>
                            <a href=""><i class="fa-solid fa-check"></i></a>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )
}

export default FilteredSearchBox;