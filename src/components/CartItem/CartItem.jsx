import Swal from "sweetalert2";

const CartItem = ({ item, cartItems, setCartItems }) => {
    const { _id, image, brandName, carName, carPrice, carType } = item;
    console.log(item);
    console.log(_id);

    //try delete implementation
    const handleDelete = _id => {
        console.log('clicked', _id);
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/cart/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your COffee has been deleted.",
                                icon: "success"
                            })
                            const leftOvers = cartItems.filter(cart => cart._id !== _id);
                            console.log(leftOvers);
                            setCartItems(leftOvers);
                        }
                    })
            }
        });
    }

    return (
        <div className="flex justify-center">
            <div className="flex border bottom-4 gap-8">
                <div>
                    <img className="w-56 rounded-s-xl" src={image} alt="" />
                </div>
                <div>
                    <h1>{brandName}</h1>
                    <h2>{carName}</h2>
                    <h2>{carPrice}</h2>
                    <h2>{carType}</h2>
                </div>
                <div>
                    <button onClick={() => handleDelete(_id)} className="btn btn-outline btn-error">X</button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;