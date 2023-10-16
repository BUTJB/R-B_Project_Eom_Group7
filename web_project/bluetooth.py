import serial

# 串行端口名称，根据你的设置进行修改
# ser_port = "/dev/tty.YourSerialPort"  # 在Linux/macOS上
ser_port = "/dev/tty.JDY-31-SPP"  # 在Linux/macOS上
# ser_port = "COMx"  # 在Windows上，x是串行端口号

# 打开串行端口，注意修改波特率和超时时间以适应你的需要
ser = serial.Serial(ser_port, baudrate=9600, timeout=1)

try:
    while True:
        # 读取串行端口的数据
        data = ser.readline().decode('utf-8').strip()

        # 显示接收到的数据
        if data:
            print("Received:", data)

except KeyboardInterrupt:
    print("接收程序已停止")

finally:
    # 关闭串行端口
    ser.close()

