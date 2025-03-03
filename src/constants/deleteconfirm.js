import Swal from "sweetalert2";

/**
 * Show a confirmation dialog before deleting an item.
 * @param {string} itemName - The name of the item to display in the confirmation.
 * @returns {Promise<boolean>} - Resolves `true` if confirmed, otherwise `false`.
 */
const confirmDelete = async (itemName) => {
  const result = await Swal.fire({
    title: `Delete ${itemName}?`,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, Delete it!",
  });

  return result.isConfirmed;
};

export default confirmDelete;
