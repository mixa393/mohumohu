class Api::V1::WeeklyController < ApplicationController

  def show
    # statusと、チームに所属する洗濯物全てについてデータをjsonで返却する
    # id: 洗濯物ID, name: 洗濯物の名前, week_data: その週の洗濯する日か否かの配列
    # @return [json] status,data

    # 返却例
    # { status:200,
    #   data:
    #     {id: 洗濯物ID, name: 洗濯物の名前, week_data: 配列},
    #     {id: 洗濯物ID, name: 洗濯物の名前, week_data: 配列}
    # }

    laundries = Laundry.where(team_id: params[:id])
    data = []

    begin
      laundries.each do |laundry|
        data.push({ id: laundry.id,
                    name: laundry.name,
                    week_data: weekly(laundry)
                  }
        )
      end

      render json: { status: 200, data: data }
    rescue
      render json: { status: 400, message: "データが取得できませんでした" }
    end
  end

  def weekly(laundry)
    # ある洗濯物について、今日を含む1週間の中で洗濯する日orその前後の日を数字で返却する
    # @return [Array] integer
    # 洗濯する日:2, その前後の日:1, それ以外の日:0
    # 要素数7
    # 返却例: [0, 0, 1, 2, 1, 0, 0, 0]

    week_data = []

    begin
      (0...6).each { |day|
        today = Time.now.to_date

        if laundry.wash_at == today + day
          week_data.push(2)
        elsif laundry.wash_at == today + day - 1 || laundry.wash_at == today + day + 1
          week_data.push(1)
        else
          week_data.push(0)
        end
      }
    rescue
      week_data = [0, 0, 0, 0, 0, 0, 0]
    end

    week_data
  end

end
