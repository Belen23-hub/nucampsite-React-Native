import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Modal, Button } from 'react-native';
import { useState } from 'react';
import { Rating, Input } from 'react-native-elements';
import { TextInput } from 'react-native';
import { postComment } from '../features/comments/commentsSlice';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = ("");
    const [text, setText] = ("");

    handleSummit =()=>{
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    }

    const resetForm = () => {
        setRating(5);
        setAuthor("");
        setText("");
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Rating
                 style={{ fontSize: 14 }}>{item.text}</Rating>
                <Rating style={{ fontSize: 12 }}>{item.rating} Stars</Rating>
                <Rating style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Rating>
                <Rating
                imageSize={10}
                readonly
                startingValue={5}
                style={{padding: 5, alignItems: 'flex-start', paddingVertical:'5%'}}
                />
            </View>
        );
    };

    return (
        <>
        <FlatList
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId === campsite.id
            )}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                marginHorizontal: 20,
                paddingVertical: 20
            }}
            ListHeaderComponent={
                <>
                    <RenderCampsite
                        onShowModal={() => setShowModal(!showModal)}
                        campsite={campsite}
                        isFavorite={favorites.includes(campsite.id)}
                        markFavorite={() =>
                            dispatch(toggleFavorite(campsite.id))
                        }
                    />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
        <>
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating 
                    showRating
                    startingValue={5}
                    imageSize={40} 
                    onFinishRating={(rating)=> setRating(rating)} 
                    style={{paddingVertical: 10}}
                    />
                    <Input
                    placeholder="Author"
                    leftIcon ={{ type: 'font-awesome', name: 'user-o' }}
                    leftIconContainerStyle={{padding: 10}}
                    onChangeText={this.rating}
                    value
                    />
                    <Input
                    placeholder="Comment"
                    leftIcon ={{ type: 'font-awesome', name: 'comment-o' }}
                    leftIconContainerStyle={{padding: 10}}
                    onChangeText={this.rating}
                    value
                    />
                    <View style={{margin:10}}>
                        <Button
                            title="Submit"
                            color='#5637DD'
                            onPress={()=>{
                                resetForm();
                            }}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
    </>
)};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal:{
        justifyContent:'center',
        margin:20
    }
});

export default CampsiteInfoScreen;