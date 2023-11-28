import FilteredSearchBox from "./FilteredSearchBox";
import Postsbar from "./Postsbar";
import Sidebar from "./Sidebar";
import Spline from '@splinetool/react-spline';

//  const AnimatedLogo = () => {
//   return (
//     <Spline scene="https://prod.spline.design/QcxQ4Wh19h6ssZoa/scene.splinecode" />
//   );
// }



const PostsWrapper = () => {

    return (<>
        <section className="posts_header">
            {/* <AnimatedLogo/> */}
            <div className="posts_header_effect"></div>
        </section>

        {/* < !--Wrapper -- > */}
        <section id="wrapper">
            <FilteredSearchBox />
            <section class="row light">
                {/* Postsbar */}
                <Postsbar />
                {/* Sidebar */}
                <Sidebar />
            </section>
        </section >

    </>)

}

export default PostsWrapper;