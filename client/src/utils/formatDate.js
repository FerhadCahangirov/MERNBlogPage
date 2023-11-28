export const formatDate = (createdDate) => {
    const _createdDate = new Date(createdDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return _createdDate.toLocaleDateString('en-US', options);
} 