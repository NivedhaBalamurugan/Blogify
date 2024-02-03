import DelPost from './DelPost';

const DelFeed = ({ deletedposts }) => {
    return (
        <main>
            {deletedposts.map((post) => (
                <DelPost key={post.id} post={post} />
            ))}
        </main>
    )
}

export default DelFeed