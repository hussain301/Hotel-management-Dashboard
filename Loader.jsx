// Import the necessary hooks from React
import { useRef, useEffect } from 'react';

// Define the MouseUnderlay component
function MouseUnderlay() {
  // Create a ref to store a reference to the underlay div
  const underlayRef = useRef(null);
  // Get the height of the window
  const windowHeight = window.innerHeight;

  // Use the useEffect hook to add an event listener when the component mounts
  useEffect(() => {
    // Define the event handler for the mousemove event
    const handleMouseMove = (e) => {
      // Check if the underlay ref is current (i.e., the component is still mounted)
      if (underlayRef.current) {
        // Calculate the size of the underlay based on the mouse's Y position
        const size = 100 + (windowHeight - e.clientY) / 5;
        // Update the left position of the underlay to center the mouse
        underlayRef.current.style.left = `${e.clientX - size / 2}px`;
        // Update the top position of the underlay to center the mouse
        underlayRef.current.style.top = `${e.clientY - size / 2}px`;
        // Update the width of the underlay
        underlayRef.current.style.width = `${size}px`;
        // Update the height of the underlay
        underlayRef.current.style.height = `${size}px`;
      }
    };

    // Add the mousemove event listener to the window
    window.addEventListener('mousemove', handleMouseMove);

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  // Pass windowHeight as a dependency to the useEffect hook to ensure the effect runs again if windowHeight changes
  }, [windowHeight]);

  // Return the underlay div
  return (
    <div 
      ref={underlayRef} 
      style={{ 
        position: 'absolute', 
        width: '40px', 
        height: '40px', 
        backgroundColor: 'green'
      }} 
    />
  );
}

// Export the MouseUnderlay component
export default MouseUnderlay;