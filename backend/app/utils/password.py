import string
import secrets

def generate_secure_password(length: int = 12) -> str:
    """
    Generate a cryptographically secure random password.
    
    Args:
        length (int): Length of the password to generate. Defaults to 12 characters.
        
    Returns:
        str: A secure random password containing uppercase, lowercase, digits and special characters.
        
    Note:
        - Uses secrets module for cryptographically secure random generation
        - Ensures at least one character from each required character set
        - Minimum recommended length is 12 characters
    """
    if length < 12:
        raise ValueError("Password length must be at least 12 characters")

    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    password = [
        secrets.choice(lowercase),
        secrets.choice(uppercase),
        secrets.choice(digits),
        secrets.choice(symbols),
    ]

    # Fill the rest with random characters from all sets
    all_characters = lowercase + uppercase + digits + symbols
    for _ in range(length - 4):
        password.append(secrets.choice(all_characters))

    # Shuffle the password characters
    secrets.SystemRandom().shuffle(password)
    
    return ''.join(password)