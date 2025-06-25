const adminButton = document.getElementById('admin');
const headtechButton = document.getElementById('headtech');
const container = document.getElementById('container');

adminButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");

	// Clear input fields after delay to allow transition
	setTimeout(() => {
		const adminUser = document.getElementById('admin-user');
		const adminPass = document.getElementById('admin-pass');
		const loginUser = document.getElementById('login-user');
		const loginPass = document.getElementById('login-pass');

		if (adminUser) adminUser.value = '';
		if (adminPass) {
			adminPass.value = '';
			adminPass.type = 'password';
			const eyeIcon1 = document.getElementById('eye-icon1');
			if (eyeIcon1) {
				eyeIcon1.classList.remove('fa-eye');
				eyeIcon1.classList.add('fa-eye-slash');
			}
		}
		if (loginUser) loginUser.value = '';
		if (loginPass) {
			loginPass.value = '';
			loginPass.type = 'password';
			const eyeIcon = document.getElementById('eye-icon');
			if (eyeIcon) {
				eyeIcon.classList.remove('fa-eye');
				eyeIcon.classList.add('fa-eye-slash');
			}
		}
	}, 600); // Delay in ms, adjust as needed
});

headtechButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");

	// Clear input fields after delay to allow transition
	setTimeout(() => {
		const adminUser = document.getElementById('admin-user');
		const adminPass = document.getElementById('admin-pass');
		const loginUser = document.getElementById('login-user');
		const loginPass = document.getElementById('login-pass');

		if (adminUser) adminUser.value = '';
		if (adminPass) {
			adminPass.value = '';
			adminPass.type = 'password';
			const eyeIcon1 = document.getElementById('eye-icon1');
			if (eyeIcon1) {
				eyeIcon1.classList.remove('fa-eye');
				eyeIcon1.classList.add('fa-eye-slash');
			}
		}
		if (loginUser) loginUser.value = '';
		if (loginPass) {
			loginPass.value = '';
			loginPass.type = 'password';
			const eyeIcon = document.getElementById('eye-icon');
			if (eyeIcon) {
				eyeIcon.classList.remove('fa-eye');
				eyeIcon.classList.add('fa-eye-slash');
			}
		}
	}, 600); // Delay in ms, adjust as needed
});

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById('login-pass');
  const eyeIcon = document.getElementById('eye-icon');
  const passwordInput1 = document.getElementById('admin-pass');
  const eyeIcon1 = document.getElementById('eye-icon1');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // Show password
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password'; // Hide password
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
  }

  if (passwordInput1.type === 'password') {
    passwordInput1.type = 'text'; // Show password
    eyeIcon1.classList.remove('fa-eye');
    eyeIcon1.classList.add('fa-eye-slash');
  } else {
    passwordInput1.type = 'password'; // Hide password
    eyeIcon1.classList.remove('fa-eye-slash');
    eyeIcon1.classList.add('fa-eye');
  }
}

// Close OTP modal manually
const otpClose = document.getElementById('otp-close');
if (otpClose) {
  otpClose.addEventListener('click', () => {
    const modernModal = document.getElementById('otp-modal-modern');
    if (modernModal) {
      modernModal.style.display = 'none';
    }
    const container = document.getElementById('container');
    if (container) {
      container.classList.remove('blur-background');
    }
    // Sanitize OTP inputs on modal close
    sanitizeOtpInputs();
    // Clear OTP timeout when modal is manually closed
    if (window.otpTimeout) {
      clearTimeout(window.otpTimeout);
    }
  });
}

// Sanitize OTP inputs on modal close or end
function sanitizeOtpInputs() {
  otpInputs.forEach(input => input.value = '');
}

if (document.getElementById('verify-email-btn')) {
  (document.getElementById('verify-email-btn')).addEventListener('click', () => {
    const otpInput = document.getElementById("otp");
    const enteredOtp = otpInput.value.trim();
    if (enteredOtp.length < generatedOTP.length) {
      alert('Please enter the complete OTP.');
      return;
    }
    if (enteredOtp === generatedOTP) {
      alert('Login successful!');
      const modernModal = document.getElementById('otp-modal-modern');
      if (modernModal) {
        modernModal.style.display = 'none';
      }
      const container = document.getElementById('container');
      if (container) {
        container.classList.remove('blur-background');
      }
      otpInput.value = '';
      // Clear OTP timeout when OTP is successfully verified
      if (window.otpTimeout) {
        clearTimeout(window.otpTimeout);
      }
      window.location.href = 'brmis.html'; // Redirect to dashboard
    } else {
      alert('Incorrect OTP.');
      otpInput.value = '';
    }
  });
}

// Also sanitize OTP inputs when modal is closed by timeout
if (window.otpTimeout) {
  clearTimeout(window.otpTimeout);
}
window.otpTimeout = setTimeout(() => {
  const modernModal = document.getElementById('otp-modal-modern');
  if (modernModal) {
    if (modernModal.style.display !== 'none') {
      modernModal.style.display = 'none';
      const container = document.getElementById('container');
      if (container) {
        container.classList.remove('blur-background');
      }
      sanitizeOtpInputs();
      alert('OTP modal closed due to timeout.');
    }
  }
}, 30000);

// OTP input boxes handling
  const otpInputs = document.querySelectorAll('.otp-input');
  otpInputs.forEach((input, index) => {
    // Input event: replace non-digit characters
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '');
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    // Keydown event: prevent non-numeric keys except control keys
    input.addEventListener('keydown', (e) => {
      const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
      if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
});

// Verify email button click handler
const verifyEmailBtn = document.getElementById('verify-email-btn');
if (document.getElementById('verify-email-btn')) {
  (document.getElementById('verify-email-btn')).addEventListener('click', () => {
    const enteredOtp = Array.from(otpInputs).map(input => input.value).join('');
    if (enteredOtp.length < otpInputs.length) {
      alert('Please enter the complete OTP.');
      return;
    }
    if (enteredOtp === generatedOTP) {
      alert('Login successful!');
      const modernModal = document.getElementById('otp-modal-modern');
      if (modernModal) {
        modernModal.style.display = 'none';
      }
      const container = document.getElementById('container');
      if (container) {
        container.classList.remove('blur-background');
      }
      window.location.href = 'brmis.html'; // Redirect to dashboard
    } else {
      alert('Incorrect OTP.');
    }
  });
}

// Resend code link click handler
const resendCodeLink = document.getElementById('resend-code-link');
if (resendCodeLink) {
  resendCodeLink.addEventListener('click', () => {
    const isAdminActive = container.classList.contains("right-panel-active");
    const username = isAdminActive ? document.getElementById("admin-user").value : document.getElementById("login-user").value;
    const password = isAdminActive ? document.getElementById("admin-pass").value : document.getElementById("login-pass").value;

    if (username === "mark@gmail.com" && password === "securePass123") {
      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      alert("Your new OTP is: " + generatedOTP);
    } else {
      alert("Invalid credentials. Cannot resend OTP.");
    }
  });
};

// Resend OTP functionality
const resendOtpButton = document.getElementById('resend-otp');
if (resendOtpButton) {
  resendOtpButton.addEventListener('click', () => {
    const isAdminActive = container.classList.contains("right-panel-active");
    const username = isAdminActive ? document.getElementById("admin-user").value : document.getElementById("login-user").value;
    const password = isAdminActive ? document.getElementById("admin-pass").value : document.getElementById("login-pass").value;

    if (username === "mark@gmail.com" && password === "securePass123") {
      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      alert("Your new OTP is: " + generatedOTP);

      // Reset the OTP modal timeout
      const modernModal = document.getElementById("otp-modal-modern");
      if (modernModal) {
        modernModal.style.display = "flex";
      }
      if (container) {
        container.classList.add("blur-background");
      }
      // Clear any existing timeout and set a new one
      if (window.otpTimeout) {
        clearTimeout(window.otpTimeout);
      }
      window.otpTimeout = setTimeout(() => {
        if (modernModal) {
          modernModal.style.display = "none";
        }
        if (container) {
          container.classList.remove("blur-background");
      }
        alert("OTP modal closed due to timeout.");
      }, 30000);
    } else {
      alert("Invalid credentials. Cannot resend OTP.");
    }
});
}

// Blood cells animation on canvas background
const canvas = document.getElementById('bloodCellsCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let bloodCells = [];
const bloodCellCount = 50;

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @returns {number} A random number between min and max
 */
function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

class BloodCell {
	constructor() {
		this.reset();
	}

	reset() {
		// Start from random position outside the canvas from any direction
		const edge = Math.floor(randomRange(0, 4));
		switch(edge) {
			case 0: // top
				this.x = randomRange(0, width);
				this.y = -randomRange(20, 100);
				this.vx = randomRange(-0.5, 0.5);
				this.vy = randomRange(0.5, 1.5);
				break;
			case 1: // right
				this.x = width + randomRange(20, 100);
				this.y = randomRange(0, height);
				this.vx = -randomRange(0.5, 1.5);
				this.vy = randomRange(-0.5, 0.5);
				break;
			case 2: // bottom
				this.x = randomRange(0, width);
				this.y = height + randomRange(20, 100);
				this.vx = randomRange(-0.5, 0.5);
				this.vy = -randomRange(0.5, 1.5);
				break;
			case 3: // left
				this.x = -randomRange(20, 100);
				this.y = randomRange(0, height);
				this.vx = randomRange(0.5, 1.5);
				this.vy = randomRange(-0.5, 0.5);
				break;
		}
		this.size = randomRange(10, 30);
		this.angle = randomRange(0, Math.PI * 2);
		this.angularVelocity = randomRange(-0.02, 0.02);
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.angle += this.angularVelocity;

		// Reset if out of bounds
		if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
			this.reset();
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);

		// Draw blood cell shape - ellipse with gradient fill for realism
		const gradient = ctx.createRadialGradient(0, 0, this.size * 0.1, 0, 0, this.size);
		gradient.addColorStop(0, 'rgba(128, 0, 128, 0.9)');
		gradient.addColorStop(0.5, 'rgba(0, 0, 255, 0.9)');
		gradient.addColorStop(1, 'rgba(255, 182, 193, 0.9)');

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.ellipse(0, 0, this.size * 1.2, this.size * 0.7, 0, 0, Math.PI * 2);
		ctx.fill();

		// Add some highlight
		ctx.strokeStyle = 'rgba(255, 100, 100, 0.6)';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.ellipse(0, 0, this.size * 0.8, this.size * 0.5, 0, 0, Math.PI * 2);
		ctx.stroke();

		ctx.restore();
	}
}

function init() {
	resize();
	bloodCells = [];
	for (let i = 0; i < bloodCellCount; i++) {
		bloodCells.push(new BloodCell());
	}
	animate();
}

function resize() {
	width = container.clientWidth;
	height = container.clientHeight;
	canvas.width = width;
	canvas.height = height;
}

function animate() {
	ctx.clearRect(0, 0, width, height);
	for (const cell of bloodCells) {
		cell.update();
		cell.draw(ctx);
	}
	requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
	resize();
});

init();


let generatedOTP = "";

// Input validation for login forms
function validateInput(id, maxLength) {
	const input = document.getElementById(id);
	if (!input) return false;
	const value = input.value.trim();
	if (value.length === 0) {
		alert(`${id} cannot be empty.`);
		input.focus();
		return false;
	}
	if (value.length > maxLength) {
		alert(`${id} cannot exceed ${maxLength} characters.`);
		input.focus();
		return false;
	}
	return true;
}

function validateEmail(id) {
	const input = document.getElementById(id);
	if (!input) return false;
	const value = input.value.trim();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(value)) {
		alert(`Please enter a valid email address.`);
		input.focus();
		return false;
	}
	return true;
}

function verifyLogin() {
	// Determine which form is active
	const isAdminActive = container.classList.contains("right-panel-active");
	if (isAdminActive) {
		// Validate Admin form inputs
		if (!validateEmail('admin-user')) return;
		if (!validateInput('admin-pass', 20)) return;
	} else {
		// Validate Head/Tech form inputs
		if (!validateEmail('login-user')) return;
		if (!validateInput('login-pass', 20)) return;
	}

	// Only show OTP modal if inputs are valid and credentials are correct
	const username = isAdminActive ? document.getElementById("admin-user").value : document.getElementById("login-user").value;
	const password = isAdminActive ? document.getElementById("admin-pass").value : document.getElementById("login-pass").value;

	if (username === "mark@gmail.com" && password === "securePass123") {
		generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
		alert("Your OTP is: " + generatedOTP);

		const modal = document.getElementById("otp-modal");
		if (modal) {
			modal.style.display = "none";
		}

		const modernModal = document.getElementById("otp-modal-modern");
		if (modernModal) {
			modernModal.style.display = "flex";
		}

		// Add blurry background effect
		if (container) {
			container.classList.add("blur-background");
		}

		// Hide the modal automatically after 30 seconds
		if (window.otpTimeout) {
			clearTimeout(window.otpTimeout);
		}
		window.otpTimeout = setTimeout(() => {
			if (modernModal) {
				modernModal.style.display = "none";
			}
			if (container) {
				container.classList.remove("blur-background");
			}
			alert("OTP modal closed due to timeout.");
		}, 30000);
	} else {
		alert("Invalid credentials.");
	}
}

function verifyOTPModern() {
  const userOtp = document.getElementById("otp-modern").value;

  if (userOtp === generatedOTP) {
    alert("Login successful!");
    const modernModal = document.getElementById("otp-modal-modern");
    modernModal.style.display = "none";
    document.getElementById("container").classList.remove("blur-background");
    window.location.href = "brmis.html"; // Redirect to dashboard
  } else {
    alert("Incorrect OTP.");
  }
}

  // OTP input validation: allow only digits and max length 6
  const otpInput = document.getElementById("otp");
    otpInput.addEventListener("input", () => {
      otpInput.value = otpInput.value.replace(/\D/g, "").slice(0, 6);
});

function verifyOTP() {
  const userOtp = document.getElementById("otp").value;

  if (userOtp === generatedOTP) {
    alert("Login successful!");
    document.getElementById("otp-modal").style.display = "none";
    window.location.href = "brmis.html"; // Redirect to dashboard
  } else {
    alert("Incorrect OTP.");
  }
}
