import asyncio
import websockets
import json
import serial

# 串行端口名称，根据你的设置进行修改
ser_port = "/dev/tty.JDY-31-SPP"  # 在Linux/macOS上
# ser_port = "COMx"  # 在Windows上，x是串行端口号
# 打开串行端口，注意修改波特率和超时时间以适应你的需要
ser = serial.Serial(ser_port, baudrate=9600, timeout=1)
print("连接成功")


async def time(websocket, path):
    await websocket.send("Connection established")
    try:
        time_list = [0]
        while True:
            # Read a line from the serial port.
            line = ser.readline().decode('utf-8').strip()
            print(line)
            # If the line is not empty, split it into speed, run_time, and direction and send it to the client.
            if line:
                # speed, run_time, direction = map(int, line.split(','))
                run_time, direction = map(int, line.split(','))
                data = {
                    'speed': 10,
                    'run_time': run_time-time_list[len(time_list)-1],
                    'direction': direction
                }
                time_list.append(run_time)

                await websocket.send(json.dumps(data))
            await asyncio.sleep(3)
    except websockets.exceptions.ConnectionClosed:
        print("Connection closed")


start_server = websockets.serve(time, 'localhost', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
