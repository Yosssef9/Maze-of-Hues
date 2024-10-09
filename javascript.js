document.addEventListener('DOMContentLoaded', () => {
    const movingBox = document.getElementById('movingBox');
    const staticBoxes = document.querySelectorAll('.static');
    const container = document.querySelector('.container');
    const point1 = document.querySelector('.point1');
    const point2 = document.querySelector('.point2');

    const point3 = document.querySelector('.point3');
    const point4 = document.querySelector('.point4');
    const point5 = document.querySelector('.point5');
    const toHandelPoint5 = document.querySelector('.toHandelPoint5');
    const point6 = document.querySelector('.point6');
    const point7 = document.querySelector('.point7');
    const point6p2 = document.querySelector('.point6p2');
    const endLine = document.querySelector('.endLine');
    const winCase = document.querySelector('.winCase');
    let lastColor =null
    const redCollision  = document.querySelectorAll('.redCollision');
    const redDivs  = document.querySelectorAll('.red');
    const blueDivs = document.querySelectorAll('.blue');
    const blueCollision = document.querySelectorAll('.blueCollision');
    
    let boxPosition = { x: 0, y: 0 };

    // Function to check collision with container boundaries
    function checkCollisionWithContainer(box, container) {
        const boxRect = box.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        return (
            boxRect.left >= containerRect.left &&
            boxRect.right <= containerRect.right &&
            boxRect.top >= containerRect.top &&
            boxRect.bottom <= containerRect.bottom
        );
    }

    // Function to check collision between two boxes
    function checkCollision(box1, box2) {
        const rect1 = box1.getBoundingClientRect();
        const rect2 = box2.getBoundingClientRect();
        return !(
            rect1.right <= rect2.left ||
            rect1.left >= rect2.right ||
            rect1.bottom <= rect2.top ||
            rect1.top >= rect2.bottom
        );
    }

    // Movement logic
    document.addEventListener('keydown', (e) => {
        const newPosition = { ...boxPosition };

        switch (e.key) {
            case 'ArrowUp':
                newPosition.y -= 10;
                break;
            case 'ArrowDown':
                newPosition.y += 10;
                break;
            case 'ArrowLeft':
                newPosition.x -= 10;
                break;
            case 'ArrowRight':
                newPosition.x += 10;
                break;
        }


       
            
       
        // Temporarily apply the new position
        movingBox.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`;

        let collisionDetected = false;

        // Check for collision with static boxes
        staticBoxes.forEach(box => {
            if (checkCollision(movingBox, box)) {
                collisionDetected = true;
                console.log('Boxes are touching!');
            // Trigger your desired action here
            }
        });

        redCollision.forEach(box => {
            if (checkCollision(movingBox, box)) {
                lastColor = "red"
                document.documentElement.style.setProperty('--lastcolor', lastColor);
                console.log('redCollisions are touching!');
            // Trigger your desired action here
            
            }
        });
        if(lastColor == "red"){
            redDivs.forEach(box => {
                if (checkCollision(movingBox, box)) {
                    collisionDetected = true;
                  
                // Trigger your desired action here
                }
            });
        }
        blueCollision.forEach(box => {
            if (checkCollision(movingBox, box) ) {
                lastColor = "blue"
                document.documentElement.style.setProperty('--lastcolor', lastColor);
                console.log('blueCollision are touching!');
            // Trigger your desired action here
            
            }
        });
        if(lastColor == "blue"){
            blueDivs.forEach(box => {
                if (checkCollision(movingBox, box)) {
                    collisionDetected = true;
                  
                // Trigger your desired action here
                }
            });
        }
        if(checkCollision(movingBox,point2)){
            point1.style.display = "block";
            point2.style.display = "none";
        }
        if(checkCollision(movingBox,point1)){
            point2.style.display = "block";
            point1.style.display = "none";
        }
        if(checkCollision(movingBox,point4)){
            point3.style.display = "block";
            point4.style.display = "none";
        }
        if(checkCollision(movingBox,point3)){
            point4.style.display = "block";
            point3.style.display = "none";
        }
        if(checkCollision(movingBox,point6)){
            point5.style.display = "block";
            point6.style.display = "none";
            point6p2.style.display = "none";
            point3.style.display = "none";
            point4.style.display = "block";
            
        }
        if(checkCollision(movingBox,point5)){
            point6.style.display = "block";
            point6p2.style.display = "block";
            point5.style.display = "none";
            toHandelPoint5.style.display = "none";
            point7.style.display = "block";
        } if(checkCollision(movingBox,point6p2)){
            point5.style.display = "block";
            point6p2.style.display = "none";
            point6.style.display = "none";
            point3.style.display = "none";
            point4.style.display = "block";
        }  if(checkCollision(movingBox,toHandelPoint5)){
            point6p2.style.display = "block";
            point6.style.display = "block";
            point5.style.display = "none";
        }
        if(checkCollision(movingBox,point7)){
            toHandelPoint5.style.display = "block";
            point7.style.display = "none";
        }
        if(checkCollision(movingBox,endLine)){
            winCase.style.display = "block"
        }

        if(movingBox.style.transform = "translate(0px,-120px)" == "translate(0px,-120px)"){

        }

        // Check if the new position is within the container and no collision with static boxes
        if (checkCollisionWithContainer(movingBox, container) && !collisionDetected) {
            boxPosition = newPosition; // Update the position if within bounds and no collision
        } else {
            // Revert to the previous position if it moves outside the container or collides with static boxes
            movingBox.style.transform = `translate(${boxPosition.x}px, ${boxPosition.y}px)`;
        }
    });
});