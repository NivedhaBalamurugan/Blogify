import DelFeed from './DelFeed';

const About = ({ deletedposts }) => {

    return (
    
        <main className="Home">
            
            <h2>Deleted posts</h2><br></br>
            {deletedposts.length ? (
                <DelFeed deletedposts={deletedposts} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No posts to display.
                </p>
            )}
        </main>

    )
}

export default About

