import socket

def get_local_ip():
  """
  This function retrieves the local IP address of the machine.

  Returns:
    str: The local IP address of the machine.
  """
  s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
  s.connect(("8.8.8.8", 80))  # Connect to a public DNS server (Google DNS)
  local_ip = s.getsockname()[0]
  s.close()
  return local_ip

if __name__ == "__main__":
  local_ip = get_local_ip()
  print(f"Local IP Address: {local_ip}")
